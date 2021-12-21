using Backend.Data;
using Backend.ServiceAbstracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.UnitOfWork
{
    public class UnitOfWork:IUnitOfWork
    {
        private ApplicationDbContext _context;
        public UnitOfWork(ApplicationDbContext context, ICategoryService categoryService,IProductService productService,ICustomerService customerService,IOrderService orderService,IOrderProductService orderProductService)
        {
            this._context = context;
            this.CategoryService = categoryService;
            this.ProductService = productService;
            this.CustomerService = customerService;
            this.OrderService = orderService;
            this.OrderProductService = orderProductService;
        }

        public ICategoryService CategoryService { get; set; }
        public IProductService ProductService { get; set; }
        public ICustomerService CustomerService { get; set; }
        public IOrderService OrderService { get; set; }
        public IOrderProductService OrderProductService { get; set; }
        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
