const Order = require("../models/Order");

// ✅ Create a new order
const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount, paymentId, address } = req.body;

    // ✅ Validate Required Fields
    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ error: "❌ No products found in the order" });
    }
    if (!totalAmount || !paymentId) {
      return res
        .status(400)
        .json({ error: "❌ Amount and transaction ID are required" });
    }

    // ✅ Validate Address Fields
    if (
      !address ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.pincode
    ) {
      return res
        .status(400)
        .json({ error: "❌ All address fields are required" });
    }

    // ✅ Create and Save Order
    const newOrder = new Order({
      user,
      products,
      amount: totalAmount,
      transactionId: paymentId,
      status: "Processing",
      address,
    });

    await newOrder.save();
    return res
      .status(201)
      .json({ message: "✅ Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("❌ Order Creation Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "products.productId",
        select: "name price imageUrl",
      })
      .populate("deliveryBoy", "name phone");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      products: order.products.map((p) => ({
        productId: p.productId?._id || null,
        name: p.productId?.name || "Unknown Product",
        price: p.productId?.price || 0,
        imageUrl: p.productId?.imageUrl || "default-image.jpg",
        quantity: p.quantity,
      })),
      amount: order.amount,
      transactionId: order.transactionId,
      status: order.status,
      createdAt: order.createdAt,
      address: order.address
        ? {
            phone: order.address.phone || "N/A",
            street: order.address.street || "N/A",
            city: order.address.city || "N/A",
            pincode: order.address.pincode || "N/A",
          }
        : null,
      deliveryBoy: order.deliveryBoy
        ? {
            _id: order.deliveryBoy._id,
            name: order.deliveryBoy.name,
            phone: order.deliveryBoy.phone,
          }
        : null,
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// ✅ Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order); // ✅ Already includes address
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Assign a delivery boy to an order
const assignDeliveryBoy = async (req, res) => {
  try {
    const { deliveryBoyId } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { deliveryBoy: deliveryBoyId },
      { new: true }
    ).populate("deliveryBoy", "name phone");

    if (!order) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  assignDeliveryBoy,
};
