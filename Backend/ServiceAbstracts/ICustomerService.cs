using Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.ServiceAbstracts
{
    public interface ICustomerService
    {
        public List<Customer> GetAll();
        public Customer Get(int id);
        public Customer Update(Customer customer);
        public Customer Create(Customer customer);
        public Boolean Delete(int id);
    }
}
