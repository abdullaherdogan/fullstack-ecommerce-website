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
    public class OrderProductsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public OrderProductsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult<List<OrderProduct>> GetAll()
        {
            List<OrderProduct> orderProducts = _unitOfWork.OrderProductService.GetAll();
            return Ok(orderProducts);
        }

        [HttpGet("{orderId}")]
        public ActionResult<List<OrderProduct>> Get(int orderId)
        {
            List<OrderProduct> orderProducts = _unitOfWork.OrderProductService.Get(orderId);
            return Ok(orderProducts);
        }

        [HttpPost]
        public ActionResult<OrderProduct> Create(OrderProduct orderProduct)
        {
            OrderProduct _orderProduct = _unitOfWork.OrderProductService.Create(orderProduct);
            return Ok(_orderProduct);
        }
        [HttpPut]
        public ActionResult<OrderProduct> Update(OrderProduct orderProduct)
        {
            OrderProduct _orderProduct = _unitOfWork.OrderProductService.Update(orderProduct);
            return Ok(_orderProduct);
        }
        [HttpPut("quantity-increase")]
        public IActionResult QuantityIncrease(OrderProduct orderProduct)
        {
            Boolean isOk = _unitOfWork.OrderProductService.Increase(orderProduct);
            if (isOk==true)
            {
                return Ok();
            }
            return BadRequest();
        }
        [HttpPut("quantity-decrease")]
        public IActionResult QuantityDecrease(OrderProduct orderProduct)
        {
            Boolean isOk = _unitOfWork.OrderProductService.Decrease(orderProduct);
            if (isOk==true)
            {
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete("{orderId}/{productId}")]
        public IActionResult Delete(int orderId,int productId)
        {
            Boolean isOk = _unitOfWork.OrderProductService.Delete(orderId,productId);
            if (isOk==true)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}
