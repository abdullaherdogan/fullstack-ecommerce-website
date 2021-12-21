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
    public class OrderProductService : IOrderProductService
    {
        private readonly ApplicationDbContext _context;
        public OrderProductService(ApplicationDbContext context)
        {
            _context = context;
        }
        public OrderProduct Create(OrderProduct orderProduct)
        {
            OrderProduct _orderProduct = _context.OrderProducts.Where(x => x.OrderId == orderProduct.OrderId && x.ProductId == orderProduct.ProductId).SingleOrDefault();

            if (_orderProduct==null)
            {
                _context.OrderProducts.Add(orderProduct);
                _context.SaveChanges();
                return orderProduct;
            }
            else
            {
                _orderProduct.Quantity += 1;
                _context.SaveChanges();
                return _orderProduct;
            }
        }

        public bool Delete(int OrderId, int ProductId)
        {
            OrderProduct orderProduct = _context.OrderProducts.Where(x => x.OrderId == OrderId && x.ProductId==ProductId).SingleOrDefault();
            if (orderProduct==null)
            {
                return false;
            }
            _context.OrderProducts.Remove(orderProduct);
            _context.SaveChanges();
            return true;
        }

        public List<OrderProduct> Get(int OrderId)
        {
            List<OrderProduct> orderProducts = _context.OrderProducts.Where(x => x.OrderId == OrderId).ToList<OrderProduct>();
            return orderProducts;
        }

        public List<OrderProduct> GetAll()
        {
            List<OrderProduct> orderProducts = _context.OrderProducts.ToList<OrderProduct>();
            return orderProducts;
        }

        public bool Increase(OrderProduct orderProduct)
        {
            OrderProduct _orderProduct = _context.OrderProducts.Where(x => x.OrderId == orderProduct.OrderId && x.ProductId==orderProduct.ProductId).SingleOrDefault();
            if (_orderProduct!=null)
            {
                _orderProduct.Quantity += 1;
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool Decrease(OrderProduct orderProduct)
        {
            OrderProduct _orderProduct = _context.OrderProducts.Where(x => x.OrderId == orderProduct.OrderId && x.ProductId == orderProduct.ProductId).SingleOrDefault();

            if (_orderProduct != null)
            {
                
                if (orderProduct.Quantity>1)
                {
                    _orderProduct.Quantity -= 1;
                    _context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return false;
        }

        public OrderProduct Update(OrderProduct orderProduct)
        {
            _context.Entry(orderProduct).State = EntityState.Modified;
            _context.SaveChanges();
            return orderProduct;
        }
    }
}
