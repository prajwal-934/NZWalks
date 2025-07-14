import React from 'react';
import { Stack, Text } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const cardStyles = {
    root: {
      width: 200,
      padding: 20,
      borderRadius: 8,
      background: '#0078d4', // Azure blue
      color: 'white',
      cursor: 'pointer',
      boxShadow: '0 0 8px rgba(0,0,0,0.15)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    rootHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    },
  };

  return (
    <>
      
      <Stack
        horizontalAlign="center"
        verticalAlign="start"
        tokens={{ childrenGap: 40 }}
        styles={{ root: { height: '100vh', background: '#f3f2f1', paddingTop: 60 } }}
      >
        <Text  variant="xxLarge">Welcome to the Walks & Trails App</Text>

        <Stack horizontal tokens={{ childrenGap: 40 }}>
          <Stack
            styles={{
              root: {
                ...cardStyles.root,
              },
            }}
            onClick={() => navigate('/region')}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, cardStyles.rootHover)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, cardStyles.root)
            }
          >
            <Text styles={{ root: { color: 'white' } }} variant="large">Region API</Text>
          </Stack>

          <Stack
            styles={{
              root: {
                ...cardStyles.root,
              },
            }}
            onClick={() => navigate('/walks')}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, cardStyles.rootHover)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, cardStyles.root)
            }
          >
            <Text styles={{ root: { color: 'white' } }} variant="large">Walks API</Text>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
