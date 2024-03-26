import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TenderDetailPage() {
    const [tenderDetails, setTenderDetails] = useState(null);
    const { tenderId } = useParams(); // Get the tenderId from the URL

    useEffect(() => {
        const fetchTenderDetails = async () => {
            try {
                const response = await fetch(`https://tendersapi.fanxange.live/api/tenderDetails/${tenderId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTenderDetails(data.commonMultiStringListData); // Assuming the data structure
            } catch (error) {
                console.error("Could not fetch tender details:", error);
            }
        };

        fetchTenderDetails();
    }, [tenderId]); // Dependency on tenderId

    if (!tenderDetails) {
        return <div>Loading tender details...</div>; // Loading state
    }

    // Function to determine the row's background color
    const getRowBackgroundColor = (index) => {
        return index % 2 === 0 ? '#453' : '#213'; // Light gray for even, white for odd rows
    };

    return (
        <div>
            <h2>Tender Details</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    {Object.entries(tenderDetails).map(([key, value], index) => (
                        <tr key={key} style={{ backgroundColor: getRowBackgroundColor(index) }}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                {key.replace(/([A-Z])/g, ' $1').trim()} {/* Make keys more readable */}
                            </td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                {Array.isArray(value) ? value.join(', ') : value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TenderDetailPage;
