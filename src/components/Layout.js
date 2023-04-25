import StyledComponentsRegistry from '@/lib/registry';

const Layout = ({ children }) => {
  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};

export default Layout;
