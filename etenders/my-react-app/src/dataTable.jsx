import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
function DataTable() {
    const [data, setData] = useState({ commonMultiStringList: { commonMultiStringListData: [] } });
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    useEffect(() => {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint
        fetch('https://tendersapi.fanxange.live/getTenders')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    // Function to handle row click
    const handleRowClick = (tenderId) => {
        navigate(`/tender/${tenderId}`); // Navigate to the Tender Details page with the tenderId
    };
    // Styles
    const thStyle = {
        padding: '10px',
        backgroundColor: '#004085',
        color: '#fff' // Keeping header text white for contrast, adjust if needed
    };

    const tdStyle = {
        padding: '10px',
        color: '#333' // Dark text color for table data
    };

    const trStyleEven = {
        backgroundColor: '#f2f2f2'
    };

    const trStyleOdd = {
        backgroundColor: '#fff'
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '10px', padding: '8px', width: '300px', color: '#fff' }} // Dark text for input
            />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>First String</th>
                        <th style={thStyle}>Second String</th>
                        <th style={thStyle}>Third String</th>
                        <th style={thStyle}>Fourth String</th>
                        <th style={thStyle}>Fifth String</th>
                    </tr>
                </thead>
                <tbody>
                    {data.commonMultiStringList.commonMultiStringListData
                        .filter((item) => {
                            if (searchTerm === "") {
                                return item;
                            } else if (
                                item.firstString[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.secondString[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.thirdString[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.fourthString[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.fifthString[0].toLowerCase().includes(searchTerm.toLowerCase())
                            ) {
                                return item;
                            }
                            return false;
                        })
                        .map((item, index) => (
                            <tr key={index} style={index % 2 === 0 ? trStyleEven : trStyleOdd} onClick={() => handleRowClick(item.id[0])}>
                                <td style={tdStyle}>{item.id[0]}</td>
                                <td style={tdStyle}>{item.firstString[0]}</td>
                                <td style={tdStyle}>{item.secondString[0]}</td>
                                <td style={tdStyle}>{item.thirdString[0]}</td>
                                <td style={tdStyle}>{item.fourthString[0]}</td>
                                <td style={tdStyle}>{item.fifthString[0]}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
