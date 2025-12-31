import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({ product_name: '', quantity: 1 });
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders', config);
                setOrders(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchOrders();
    }, [token]);

    const onOrderSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/order', newOrder, config);
            setOrders([...orders, response.data]);
            setNewOrder({ product_name: '', quantity: 1 });
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create order');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Welcome back, {user.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Create and manage your orders using secure, protected APIs.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Create Order Section */}
                <div className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-200">
                    <div className="px-6 py-5 bg-slate-50 border-b border-slate-100">
                        <h3 className="text-lg leading-6 font-semibold text-slate-800">Create New Order</h3>
                        <p className="mt-1 text-sm text-slate-500">Enter product details below to place a new order.</p>
                    </div>
                    <div className="px-6 py-8">
                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-md">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700 font-medium">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <form onSubmit={onOrderSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="product_name" className="block text-sm font-medium text-slate-700">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="product_name"
                                        id="product_name"
                                        value={newOrder.product_name}
                                        onChange={(e) => setNewOrder({ ...newOrder, product_name: e.target.value })}
                                        className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                                        placeholder="e.g. Wireless Headphones"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-slate-700">
                                    Quantity
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        min="1"
                                        value={newOrder.quantity}
                                        onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                                        className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:shadow-lg transform active:scale-[0.99]"
                                >
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Orders List Section */}
                <div className="bg-white overflow-hidden shadow-md rounded-xl border border-slate-200 flex flex-col h-full">
                    <div className="px-6 py-5 bg-slate-50 border-b border-slate-100">
                        <h3 className="text-lg leading-6 font-semibold text-slate-800">Your Orders</h3>
                        <p className="mt-1 max-w-2xl text-sm text-slate-500">
                            Only orders created by your account are shown here.
                        </p>
                    </div>
                    <div className="px-6 py-6 flex-1 bg-white">
                        {orders.length === 0 ? (
                            <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                                <div className="bg-slate-50 p-4 rounded-full mb-3">
                                    <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-slate-900">No orders placed yet.</p>
                                <p className="mt-1 text-sm text-slate-500">Create your first order to see it listed here.</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {orders.map((order) => (
                                    <li key={order._id} className="py-4 flex items-center justify-between hover:bg-slate-50 transition-colors duration-150 px-3 rounded-md -mx-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-900 truncate mb-1">{order.product_name}</p>
                                            <p className="text-xs text-slate-500 flex items-center">
                                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-2"></span>
                                                Ordered: {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                                                Qty: {order.quantity}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
