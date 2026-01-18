import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
	return (
		<div className="grid gap-12 px-4 pt-4 pb-12 md:px-6 md:pt-6 md:pb-20 lg:gap-16 lg:px-28 lg:pt-12">
			<Header />
			<MainContent />
		</div>
	);
}

export default App;
