using Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.ServiceAbstracts
{
    public interface IOrderService
    {
        public Order Get(int id);
        public Order GetByCustomer(int customerId);
        public Order Create(Order order);
        public Order Update( Order order);
        public Boolean Delete(int id);
    }
}
