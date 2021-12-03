export const fetchTransaction = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const blockTransaction = async (id, endpoint, setLoading) => {
  try {
    const response = await fetch(endpoint + `${id}/block`, {
      method: "POST",
    });
    if (response.ok) {
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const approveTransaction = async (id, endpoint, setLoading) => {
  try {
    const response = await fetch(endpoint + `${id}/approve`, {
      method: "POST",
    });
    if (response.ok) {
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};
