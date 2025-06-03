import Directory from '../../components/directory/directory';
import { Outlet } from 'react-router-dom';

const Home = () => {

  return (
    <>
      <div>
        <Directory />
        <Outlet />
      </div>

    </>
  );
}

export default Home;