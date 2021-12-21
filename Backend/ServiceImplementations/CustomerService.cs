using Backend.Data;
using Backend.Entities;
using Backend.ServiceAbstracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.ServiceImplementations
{
    public class CustomerService:ICustomerService
    {
        private readonly ApplicationDbContext _context;
        public CustomerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Customer Create(Customer customer)
        {
            customer.CreateDate = DateTime.Now;
            _context.Customers.Add(customer);
            _context.SaveChanges();
            return customer;
        }

        public bool Delete(int id)
        {
            Customer customer = _context.Customers.Where(x => x.Id == id).SingleOrDefault();
            if (customer==null)
            {
                return false;
            }
            _context.Customers.Remove(customer);
            _context.SaveChanges();
            return true;
        }

        public Customer Get(int id)
        {
            Customer customer = _context.Customers.Where(x => x.Id == id).SingleOrDefault();
            return customer;
        }

        public List<Customer> GetAll()
        {
            List<Customer> customers = _context.Customers.ToList<Customer>();
            return customers;
        }

        public Customer Update(Customer customer)
        {
            customer.UpdateDate = DateTime.Now;
            _context.Entry(customer).State = EntityState.Modified;
            _context.SaveChanges();
            return customer;
        }
    }
}
