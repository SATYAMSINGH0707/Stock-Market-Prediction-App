import React,
{
	useState,
	useEffect
} from 'react';
import {
	StyleSheet, Text,
	View, TextInput,
	TouchableOpacity
} from 'react-native';

export default function App() {
	const [symbol, setSymbol] = useState('');
	const [stockData, setStockData] = useState(null);
	const [predictedPrice, setPredictedPrice] = useState(null);

	const fetchData = async () => {
		try {
			const apiKey = 'THQZJ6R7T3HS9979'; // Replace with your API key
			const response = await fetch(
`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
			);
			const data = await response.json();

			if (data['Global Quote']) {
				setStockData(data['Global Quote']);
				predictNextTradingDayPrice(data['Global Quote']);
			} else {
				console.error('Invalid response format');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const predictNextTradingDayPrice =
		(stockInfo) => {
			// Simple prediction logic for demonstration purposes
			const latestPrice =
				parseFloat(stockInfo['05. price']);
			const changePercent =
				parseFloat(
					stockInfo['10. change percent']
						.replace('%', '')) / 100;
			const predictedPrice =
				latestPrice * (1 + changePercent);

			setPredictedPrice(predictedPrice.toFixed(4));
		};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Stock Market Prediction App
			</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter Stock Symbol"
				value={symbol}
				onChangeText={(text) => setSymbol(text)} />
			<TouchableOpacity style={styles.btn}
				onPress={fetchData}>
				<Text style={styles.btnText}>
					<Text style={styles.animation}>
					</Text>
					Get Stock Data
					<Text style={styles.animation}></Text>
				</Text>
			</TouchableOpacity>
			{predictedPrice && (
				<Text style={styles.result}>
					Predicted Price for Next
					Trading Day: {predictedPrice}
				</Text>
			)}
			{stockData && (
				<View style={styles.stockInfoContainer}>
					{
						Object.entries(stockData)
							.map(([key, value]) => (
								<View key={key}
									style={styles.stockInfoItem}>
									<Text style={styles.stockInfoLabel}>
										{key}:
									</Text>
									<Text style={styles.stockInfoText}>
										{value}
									</Text>
								</View>
							))
					}
				</View>
			)}


		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
		padding: 20,
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
		color: 'white',
		fontWeight: 'bold',
	},
	input: {
		height: 40,
		borderColor: 'white',
		borderWidth: 1,
		marginBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		color: 'white',
		borderRadius: 5,
	},
	btn: {
		backgroundColor: '#40B3A2',
		padding: 16,
		borderRadius: 4,
		minWidth: 200,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		shadowColor: 'rgba(0, 0, 0, 0.1)',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 12,
		overflow: 'hidden',
		marginVertical: 10,
	},
	btnText: {
		color: 'white',
		fontSize: 12,
		fontWeight: '600',
		letterSpacing: 1.2,
		textTransform: 'uppercase',
		overflow: 'hidden',
	},
	animation: {
		borderRadius: 100,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		height: 80,
		width: 80,
		position: 'absolute',
	},
	stockInfoContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20,
	},
	stockInfoItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 10,
		marginBottom: 10,
		backgroundColor: '#001F3F',
		padding: 10,
		borderRadius: 5,
	},
	stockInfoLabel: {
		fontWeight: 'bold',
		marginRight: 5,
		color: 'white',
	},
	stockInfoText: {
		color: 'white',
	},
	result: {
		marginTop: 20,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
	},
});
