const Employee = require('../employee.model.js');
const expect = require('chai').expect;
//const mongoose = require('mongoose');

describe('Employee', () => {

    // Test 1
    it('should throw an error if no "firstName", "lastName", "department" arg', () => {
        const emp = new Employee({}); // create new Department, but don't set `name` attr value

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
    });

    // Test 2
    it('Should throw an error if firstName is not a string', () => {
        const cases = [{}, []];
        for (let firstName of cases) {
          const emp = new Employee({ firstName });
    
          emp.validate(err => {
            expect(err.errors.firstName).to.exist;
          })
        }
      });
    
      it('Should throw an error if lastName is not a string', () => {
        const cases = [{}, []];
        for (let lastName of cases) {
          const emp = new Employee({ lastName });
    
          emp.validate(err => {
            expect(err.errors.lastName).to.exist;
          })
        }
    
      });
    
      it('Should throw an error if department is not a string', () => {
        const cases = [{}, []];
        for (let department of cases) {
          const emp = new Employee({ department });
    
          emp.validate(err => {
            expect(err.errors.department).to.exist;
          })
        }
    
      });

    // Test 3 
    it('should not throw an error if args are correct', () => {
        const emp = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });

        emp.validate(err => {
            expect(err).to.not.exist;
        })
    })

});