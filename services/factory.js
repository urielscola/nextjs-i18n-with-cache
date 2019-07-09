import qs from 'querystring';

export default ({ instance, config, resourceName }) => ({
	list: (data) => {
    const query = data ? `?${qs.stringify(data)}` : '';
    const { headers } = config();

		return instance({
			method: 'GET',
      url: `/${resourceName}${query}`,
      headers
		});
	},
	post: (id, data) => {
    const { headers } = config();

		return instance({
			method: 'POST',
      url: `/${resourceName}/${id}`,
      data,
      headers
		});
  },
  delete: (id) => {
    const { headers } = config();

    return instance({
			method: 'DELETE',
      url: `/${resourceName}/${id}`,
      headers
		});
  }
});