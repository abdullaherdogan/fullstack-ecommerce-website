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
    public class ProductService:IProductService
    {
        private readonly ApplicationDbContext _context;
        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Product Create(Product product)
        {
            product.CreateDate = DateTime.Now;
            _context.Products.Add(product);
            _context.SaveChanges();
            return product;
        }

        public Boolean Delete(int id)
        {
            Product product = _context.Products.Where(x => x.Id == id).SingleOrDefault();
            if (product!=null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public Product Get(int id)
        {
            Product product = _context.Products.Where(x => x.Id == id).SingleOrDefault();
            return product;
        }

        public List<Product> GetAll()
        {
            List<Product> products = _context.Products.ToList<Product>();
            return products;
        }

        public List<Product> GetAll(int categoryId)
        {
            List<Product> products = _context.Products.Where(x=>x.CategoryId==categoryId).ToList<Product>();
            return products;
        }

        public Product Update(Product product)
        {
            product.UpdateDate = DateTime.Now;
            _context.Entry(product).State = EntityState.Modified;
            _context.SaveChanges();
            return product;
        }
    }
}
