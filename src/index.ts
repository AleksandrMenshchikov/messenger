import './index.css';
import initialController from './controllers/initial-controller';

document.addEventListener('DOMContentLoaded', () => {
  initialController.getUser();
});
