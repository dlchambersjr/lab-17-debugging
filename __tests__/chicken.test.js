import { startDB, stopDB } from './supergoose.js';
import Chicken from '../src/chicken/model.js';
import Coop from '../src/coop/model.js';

beforeAll(startDB);
afterAll(stopDB);
beforeEach(async () => {
  Chicken.deleteMany({});
  Coop.deleteMany({});
});

describe('Chicken', () => {
  it('should create and populate', (done) => {

    Coop.create({ location: 'Red Barn' }).then(coop => {

      Chicken.create({ name: 'Joey', coop }).then((chicken) => {

        expect(chicken.name).toBe('Joey');

        Chicken.findById(chicken).then(pollo => {

          expect(pollo.coop.location).toBe('Red Barn');

          done();

        });

      });

    });
  });

  it('should create and populate - async/await', async () => {

    const coop = await Coop.create({ location: 'Blue Barn' });

    const chicken = await Chicken.create({ name: 'Billy', coop: coop._id });

    expect(chicken.name).toBe('Billy');

    const pollo = await Chicken.findById(chicken._id).populate('coop');

    expect(pollo.coop.location).toBe('Blue Barn');

  });
});