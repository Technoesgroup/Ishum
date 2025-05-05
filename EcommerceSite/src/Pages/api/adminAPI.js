import axios from 'axios';

export const fetchOnlineOrders = async () => {
  const res = await axios.get('/api/admin/orders/online');
  return res.data;
};
