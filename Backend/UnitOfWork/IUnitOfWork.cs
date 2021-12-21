using Backend.ServiceAbstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.UnitOfWork
{
    public interface IUnitOfWork
    {
        public ICategoryService CategoryService { get; set; }
        public IProductService ProductService { get; set; }
        public ICustomerService CustomerService { get; set; }
        public IOrderService OrderService { get; set; }
        public IOrderProductService OrderProductService { get; set; }
        public void SaveChanges();
    }
}
