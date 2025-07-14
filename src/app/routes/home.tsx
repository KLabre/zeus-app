// Import components
import { Welcome } from '../components/welcome/welcome';

export function meta() {
  return [{ title: 'Zeus App' }, { name: 'description', content: 'Welcome to Zeus!' }];
}

export default function Home() {
  return <Welcome />;
}
