import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from API
 * @param {Function} fetchFunction - The API function to call
 * @param {Array} dependencies - Dependencies that trigger re-fetch
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (fetchFunction, dependencies = []) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);
			const result = await fetchFunction();
			setData(result);
		} catch (err) {
			setError(err.message || 'An error occurred');
			console.error('Fetch error:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);

	return { data, loading, error, refetch: fetchData };
};

/**
 * Example usage:
 *
 * const { data: zones, loading, error, refetch } = useFetch(
 *   () => zoneService.getAllZones({ severity: 'critical' }),
 *   [] // Empty array means fetch once on mount
 * );
 *
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error}</div>;
 * return <div>{zones?.map(...)}</div>;
 */
