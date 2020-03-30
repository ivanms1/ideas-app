import { useState } from 'react';
import { Button, Tab, Tabs } from '@blueprintjs/core';

import ExploreIdeas from './ExploreIdeas';
import OwnIdeas from './OwnIdeas';

import styles from './home.module.css';
import IdeaDrawer from './IdeaDrawer';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState<number | string>('your-ideas');
  const [isIdeasDrawerOpen, setIsIdeasDrawerOpen] = useState(false);
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <h1>Welcome To The Ideas App</h1>
        <Button
          type='button'
          icon='add'
          onClick={() => setIsIdeasDrawerOpen(true)}
          large
          intent='success'
        >
          Create an Idea
        </Button>
      </div>

      <Tabs
        id='tabs'
        className={styles.TabContainer}
        selectedTabId={selectedTab}
        onChange={tab => setSelectedTab(tab)}
        large
      >
        <Tab id='your-ideas' title='Your Ideas' panel={<OwnIdeas />} />
        <Tab
          id='explore-ideas'
          title='Explore Ideas'
          panel={<ExploreIdeas />}
          panelClassName='ember-panel'
        />
      </Tabs>
      <IdeaDrawer
        isOpen={isIdeasDrawerOpen}
        onClose={() => setIsIdeasDrawerOpen(false)}
      />
    </div>
  );
};

export default Home;
