using Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.ServiceAbstracts
{
    public interface IOrderProductService
    {
        public List<OrderProduct> GetAll();
        public List<OrderProduct> Get(int OrderId);
        public OrderProduct Create(OrderProduct orderProduct);
        public OrderProduct Update( OrderProduct orderProduct);
        public Boolean Increase(OrderProduct orderProduct);
        public Boolean Decrease(OrderProduct orderProduct);
        public Boolean Delete(int OrderId,int ProductId);
    }
}
