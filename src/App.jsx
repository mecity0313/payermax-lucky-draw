import MainLayout from './components/Layout/MainLayout';
import HomeView from './views/HomeView';
import LotteryDisplay from './views/LotteryDisplay';
import EndView from './views/EndView';
import { useLottery } from './store/LotteryContext';

function App() {
    const { currentPhase } = useLottery();

    return (
        <MainLayout>
            {currentPhase === 'HOME' && <HomeView />}
            {(currentPhase === 'WAIT' || currentPhase === 'DRAWING' || currentPhase === 'RESULT') && (
                <LotteryDisplay />
            )}
            {currentPhase === 'END' && <EndView />}
        </MainLayout>
    );
}

export default App;
