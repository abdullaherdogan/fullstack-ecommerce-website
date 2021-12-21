import { createContext, useContext, useState } from "react";
import axios from "axios";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const baseUrl = "https://ecommerceappbackend.azurewebsites.net/api/";
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [product, setProduct] = useState();
    const [customer, setCustomer] = useState();
    const [customers, setCustomers] = useState();
    const [order, setOrder] = useState();
    const [ordersByCustomer, setOrdersByCustomer] = useState();
    const [orderListById, setOrderListById] = useState();
    const [filteredProducts, setFilteredProducts] = useState();

    const getOrderFromLocalStorage = async () => {
        setOrder(JSON.parse(localStorage.getItem("order")));
    };

    // Category
    const getCategories = () => {
        axios
            .get(baseUrl + "categories")
            .then((res) => setCategories(res.data));
    };

    const postCategory = async (values) => {
        if (values.id == null) {
            await axios
                .post(baseUrl + "categories", {
                    name: values.categoryName,
                })
                .then(() => {
                    getCategories();
                });
        } else {
            await axios
                .put(baseUrl + "categories", {
                    id: values.id,
                    name: values.categoryName,
                })
                .then(() => {
                    getCategories();
                });
        }
    };

    // Product
    const getProductById = (productId) => {
        axios
            .get(baseUrl + `products/product/${productId}`)
            .then((res) => setProduct(res.data));
    };

    const getProducts = () => {
        axios.get(baseUrl + "products").then((res) => setProducts(res.data));
    };

    const getProductsByCategory = (categoryId) => {
        if (categoryId) {
            axios
                .get(baseUrl + `products/${categoryId}`)
                .then((res) => setFilteredProducts(res.data));
        } else setFilteredProducts(products);
    };

    const postProduct = async (values) => {
        if (values.id == null) {
            await axios
                .post(baseUrl + "products", {
                    categoryId: values.categoryId,
                    name: values.name,
                    description: values.description,
                    imageUrl: values.imageUrl,
                    price: values.price,
                })
                .then(() => {
                    getProducts();
                });
        } else {
            await axios
                .put(baseUrl + "products", {
                    id: values.id,
                    categoryId: values.categoryId,
                    name: values.name,
                    description: values.description,
                    imageUrl: values.imageUrl,
                    price: values.price,
                })
                .then(() => {
                    getProducts();
                });
        }
    };

    // Order

    const getOrderById = async (orderId) => {
        await axios
            .get(baseUrl + `orders/${orderId}`)
            .then((res) => setOrder(res.data));
    };
    const getOrderListById = async (orderId) => {
        await axios.get(baseUrl + `orderproducts/${orderId}`).then((res) => {
            setOrderListById(res.data);
        });
    };
    const getOrdersByCustomer = async (customerId) => {
        await axios
            .get(baseUrl + `orders/customer/${customerId}`)
            .then((res) => {
                setOrdersByCustomer(res.data);
            });
    };
    // Customer
    const getCustomers = async () => {
        await axios
            .get(baseUrl + "customers")
            .then((res) => setCustomers(res.data));
    };

    const getCustomerById = async (customerId) => {
        await axios
            .get(baseUrl + `customers/${customerId}`)
            .then((res) => setCustomer(res.data));
    };

    const postCustomer = async (values) => {
        if (values.id == null) {
            await axios.post(baseUrl + "customers", {
                name: values.name,
                surname: values.surname,
                adress: values.adress,
                email: values.email,
            });
        } else {
            await axios.put(baseUrl + "customers", {
                id: values.id,
                name: values.name,
                surname: values.surname,
                adress: values.adress,
                email: values.email,
            });
        }
    };

    // Basket

    const addToBasket = async (productId, orderId) => {
        if (orderId) {
            axios.post(baseUrl + "orderproducts", {
                orderId: orderId,
                productId: productId,
            });
        } else {
            await axios
                .post(baseUrl + "customers", {
                    name: "visitor",
                })
                .then((customer) => {
                    axios
                        .post(baseUrl + "orders", {
                            customerId: customer.data.id,
                        })
                        .then((order) => {
                            localStorage.setItem(
                                "order",
                                JSON.stringify(order.data)
                            );
                            axios
                                .post(baseUrl + "orderproducts", {
                                    orderId: order.data.id,
                                    productId: productId,
                                })
                                .then((orderPro) => {
                                    localStorage.setItem(
                                        "orderProduct",
                                        JSON.stringify(orderPro.data)
                                    );
                                });
                        });
                });
        }
    };

    // init
    const componentInit = () => {
        getCategories();
        getProducts();
        getCustomers();
    };

    // Values for Provider
    const values = {
        getCategories,
        getProducts,
        categories,
        setCategories,
        products,
        product,
        postCategory,
        postProduct,
        getProductsByCategory,
        filteredProducts,
        setFilteredProducts,
        addToBasket,
        componentInit,
        getOrderById,
        getCustomerById,
        customer,
        getCustomers,
        customers,
        postCustomer,
        getProductById,
        getOrderFromLocalStorage,
        getOrdersByCustomer,
        ordersByCustomer,
        order,
        getOrderListById,
        orderListById,
    };
    return (
        <DataContext.Provider value={values}>{children}</DataContext.Provider>
    );
};
export const useDataContext = () => useContext(DataContext);
