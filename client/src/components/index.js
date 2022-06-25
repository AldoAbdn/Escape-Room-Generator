// Escape Room Generator
import App from './App';
import Main from './Main';
import BusinessLogic from './BusinessLogic';
import About from './About';
import Tutorials from './Tutorials';
// Escape Room
import Dashboard from './components/Dashboard';
import EscapeRoomDesigner from './components/EscapeRoomDesigner';
import Details from './components/Details';
import Design from './components/Design';
import Pallet from './components/Pallet';
import ComponentArranger from './components/ComponentArranger';
import AreaDnDSource from './components/AreaDnDSource';
import AreaDnDTarget from './components/AreaDnDTarget';
import AreaPalletItem from './components/AreaPalletItem'
import ComponentDnDSource from './components/ComponentDnDSource';
import ComponentDnDTarget from './components/ComponentDnDTarget';
import ComponentDetails from './components/ComponentDetails';
import Accessibility from './components/Accessibility';
import LockGenerator from './components/LockGenerator';
import PuzzleGenerator from './components/PuzzleGenerator';
import PalletItem from './components/PalletItem';
// Web
import Profile from './components/Profile'
import Login from './components/Login';
import Signup from './components/SignUp';
import ConditionalRoute from '../../client/src/components/ConditionalRoute';
import NotFound from './components/NotFound';
import ListCreator from './components/ListCreator';
import PasswordStrengthMeter from './components/PasswordStrengthMeter';
import Verify from './components/Verify';
import Reset from './components/Reset';

/**
 * Escape Room Generate Application Components
 * @module Components/index
 * @author Alistair Quinn
 */

/** All Components */
export {
    // Escape Room Generator
    App, Main, BusinessLogic, About, Tutorials,
    // Escape Room
    Accessibility, AreaDnDSource, AreaDnDTarget, AreaPalletItem, ComponentArranger, ComponentDetails, ComponentDnDSource, ComponentDnDTarget, Dashboard, Design, Details, EscapeRoomDesigner, LockGenerator, Pallet, PalletItem, PuzzleGenerator,
    // Web
    Profile, Login, Signup, ConditionalRoute, NotFound, ListCreator, PasswordStrengthMeter, Verify, Reset
}