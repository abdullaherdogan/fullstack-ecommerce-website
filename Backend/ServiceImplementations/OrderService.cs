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
    public class OrderService:IOrderService
    {
        private readonly ApplicationDbContext _context;
        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Order Create(Order order)
        {
            order.CreateDate = DateTime.Now;
            _context.Orders.Add(order);
            _context.SaveChanges();
            return order;
        }

        public Boolean Delete(int id)
        {
            Order order = _context.Orders.Where(x => x.Id == id).SingleOrDefault();
            if (order==null)
            {
                return false;
            }
            _context.Orders.Remove(order);
            _context.SaveChanges();
            return true;
        }

        public Order Get(int id)
        {
            Order order = _context.Orders.Where(x => x.Id == id).SingleOrDefault();
            return order;
        }

        public Order GetByCustomer(int customerId)
        {
            Order order = _context.Orders.Where(x => x.CustomerId == customerId).FirstOrDefault();
            return order;
        }

        public Order Update(Order order)
        {
            order.UpdateDate = DateTime.Now;
            _context.Entry(order).State = EntityState.Modified;
            _context.SaveChanges();
            return order;
        }
    }
}
