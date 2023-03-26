import AppHeader from "../app-header/AppHeader";
import AppMain from "../main/AppMain";
import styles from './App.module.css';

function App() {
    return (
        <div className={styles.app}>
            <AppHeader/>
            <AppMain/>
        </div>
    );
}

export default App;
