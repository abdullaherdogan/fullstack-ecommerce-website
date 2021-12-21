using Backend.Entities;
using Backend.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public OrdersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        public ActionResult<Order> Get(int id)
        {
            Order order = _unitOfWork.OrderService.Get(id);
            return Ok(order);
        }
        [HttpGet("customer/{customerId}")]
        public ActionResult<Order> GetByCustomer(int customerId)
        {
            Order order = _unitOfWork.OrderService.GetByCustomer(customerId);
            return Ok(order);
        }
        [HttpPost]
        public ActionResult<Order> Create(Order order)
        {
            order.CreateDate = DateTime.Now;
            Order _order = _unitOfWork.OrderService.Create(order);
            return Ok(_order);
        }
        [HttpPut]
        public ActionResult<Order> Update(Order order)
        {
            order.UpdateDate = DateTime.Now;
            Order _order = _unitOfWork.OrderService.Update(order);
            return Ok(_order);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Boolean isOk = _unitOfWork.OrderService.Delete(id);
            if (isOk==false)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
