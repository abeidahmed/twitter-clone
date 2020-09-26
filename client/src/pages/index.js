import React from 'react';
import { useSetTitle } from 'store/page-title';
import { Avatar } from 'components/avatar';
import { IconButton, Button } from 'components/button';
import { Icon } from 'components/icon';
import { Divider } from 'components/divider';

function Home() {
  useSetTitle('Home', null);

  return (
    <main>
      <MobileTweetButton />
      <section className="hidden sm:block">
        <div className="flex px-4 py-2">
          <div className="flex-shrink-0">
            <Avatar size="lg" src="" alt="" />
          </div>
          <div className="flex-1 ml-3">
            <div className="flex flex-col">
              <label htmlFor="tweet-main-textarea" className="sr-only">
                Create text
              </label>
              <textarea
                id="tweet-main-textarea"
                rows="4"
                placeholder="What's happening?"
                className="block w-full h-auto p-0 pt-2 text-lg border-none resize-none focus:shadow-none form-textarea"
              />
              <hr className="my-2 border-gray-200" />
              <div className="flex items-center justify-between">
                <div className="flex items-center -ml-2">
                  <IconButton size="md" color="primary-text">
                    <Icon icon="photograph" className="w-6 h-6" />
                  </IconButton>
                  <IconButton size="md" color="primary-text">
                    <Icon icon="smiley" className="w-6 h-6" />
                  </IconButton>
                  <IconButton size="md" color="primary-text">
                    <Icon icon="calendar" className="w-6 h-6" />
                  </IconButton>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-gray-500">12/280</p>
                  <Button color="primary" size="md">
                    Tweet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
      </section>
    </main>
  );
}

function MobileTweetButton() {
  return (
    <div className="fixed right-4 bottom-20 sm:hidden">
      <IconButton size="lg" color="primary">
        <Icon icon="magic-wand" className="w-6 h-6" />
      </IconButton>
    </div>
  );
}

export default Home;
