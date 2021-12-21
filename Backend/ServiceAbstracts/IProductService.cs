using Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.ServiceAbstracts
{
    public interface IProductService
    {
        public List<Product> GetAll();
        public List<Product> GetAll(int categoryId);
        public Product Get(int id);
        public Product Update(Product product);
        public Product Create(Product product);
        public Boolean Delete(int id);
    }
}
