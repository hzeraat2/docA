const schemas = require('./schemas');

const isoDate = new Date().toISOString();
let testPayload;


beforeEach(() => {
   testPayload = {
      id: "ef543bd0-d97c-412c-8f4c-f36c33c598ef",
      type: "SHIFT",
      priceInPence: 1000,
      status: "AVAILABLE",
      createdAt: isoDate
   }
});

describe('When The data schema is used', () => {
   it('should accept a valid payload and return the checked payload correctly', async () => {
      const result = await schemas.jobSchema.validateAsync(testPayload);

      console.log(result.createdAt)
      expect(result.id).toBe(testPayload.id);
      expect(result.type).toBe(testPayload.type);
      expect(result.priceInPence).toBe(testPayload.priceInPence);
      expect(result.status).toBe(testPayload.status);
      expect(new Date(result.createdAt)).toStrictEqual(new Date(testPayload.createdAt));
   })


   it('should not accept negative price', async () => {

      testPayload.priceInPence = -100
      try {
         await schemas.jobSchema.validateAsync(testPayload);
      } catch (err) {
         expect(err.toString()).toEqual('ValidationError: \"priceInPence\" must be larger than or equal to 0');
      }
   })

   it('should not accept invalid price values', async () => {

      testPayload.priceInPence = 'not a number'
      try {
         await schemas.jobSchema.validateAsync(testPayload);
      } catch (err) {
         expect(err.toString()).toEqual('ValidationError: \"priceInPence\" must be a number');
      }
   })


   it('should not accept invalid email format', async () => {
      testPayload.contactEmail = 'Not an email!'
      try {
         await schemas.jobSchema.validateAsync(testPayload);
      } catch (err) {
         expect(err.toString()).toEqual('ValidationError: "contactEmail" must be a valid email');
      }
   })


   it('should not accept invalid type format', async () => {

      testPayload.type = 'Not a valid type!'
      try {
         await schemas.jobSchema.validateAsync(testPayload);
      } catch (err) {
         expect(err.toString()).toEqual('ValidationError: \"type\" with value "Not a valid type!" fails to match the required pattern: /ON_DEMAND|SHIFT|SCHEDULED/');
      }
   })


   it('should not accept invalid status format', async () => {

      testPayload.status = 'Not a valid status!'
      try {
         await schemas.jobSchema.validateAsync(testPayload);
      } catch (err) {
         expect(err.toString()).toEqual('ValidationError: \"status\" with value "Not a valid status\!" fails to match the required pattern: /AVAILABLE|ASSIGNED|COMPLETED/');
      }
   });
});