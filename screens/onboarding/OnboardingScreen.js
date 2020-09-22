import React from 'react';
import { Text, View, List } from 'react-native-paper';
import SpreadsheetStore from '../../stores/Spreadsheet';
import OAuthStore from '../../stores/OAuth';
import SpreadsheetStore from '../../stores/Spreadsheet';
import { StepsState, StepsContext } from '../../components/stepbar';
import Intro from './Intro';
import Steps from './Steps';
import SelectFile from './SelectFile';

const OnboardingScreen = () => {
  const stepsContext = useContext(StepsContext);
  const { setCurrentStep } = stepsContext;
  const [isActive, setActive] = useState(true);
  const [isNewby, setNewby] = useState(true);
  const [isLinkedSheet, setLinkedSheet] = useState(false);

  const routes = [
    {
      title: 'Introduction',
      component: () => (
        <Intro
          onSkip={() => {
            setActive(false);
          }}
          onRestore={() => {
            setNewby(false);
          }}
          onLink={linkUrl => {
            const isValid = SpreadsheetStore.isValidURL(linkUrl);
            setLinkedSheet(isValid);
          }}
        />
      ),
    },
    {
      title: 'Sign in',
      component: () => {
        OAuthStore.logIn().then(() => setCurrentStep(2));
        return (
          <View>
            <Text>Sign in with Google</Text>
          </View>
        );
      },
    },
    {
      title: 'Choose spreedsheet',
      component: () => (
        <SelectFile
          onSelect={() => {
            SpreadsheetStore.spreadsheetId = item.id;
            setCurrentStep(3);
          }}
        />
      ),
    },
    {
      title: 'Finish',
      component: () => {
        // SpreadsheetStore
        return (
          <View>
            <Text>Import existing data</Text>
          </View>
        )
      },
    },
  ];

  return (
    <Modal
      visible={isActive}
      contentContainerStyle={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
      }}>
      <StepsState>
        <Steps routes={routes} />
      </StepsState>
    </Modal>
  );
};

export default OnboardingScreen;
