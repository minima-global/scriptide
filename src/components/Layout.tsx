import { Box } from '@chakra-ui/react';
import Header from './app/Header';
import NoMobile from './app/NoMobile';
import Content from './app/Content';
import Footer from './app/Footer';
import Modals from './app/Modals';

function Layout() {
  return (
    <>
      <Header />

      <Box className="sm:hidden">
        <NoMobile />
      </Box>

      <Box className="hidden sm:block">
        <Content />
      </Box>

      <Footer />

      <Modals />
    </>
  );
}

export default Layout;
