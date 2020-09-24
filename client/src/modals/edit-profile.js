import React, { useState } from 'react';
import { ModalWrapper } from 'components/modal-wrapper';
import { Icon } from 'components/icon';
import { Input } from 'components/input';
import { Textarea } from 'components/textarea';

function EditProfile() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState([]);

  function isThreshold(current, limit) {
    return current > limit;
  }

  return (
    <ModalWrapper modalTitle="Edit profile">
      <div className="flex flex-col -mt-10">
        <section className="flex flex-col">
          <div className="-mx-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <label className="p-2 transition duration-150 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline-gray hover:bg-gray-600">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                  <Icon className="w-5 h-5 text-white" icon="camera" />
                </label>
              </div>
              <img
                className="flex-shrink-0 object-cover w-full h-48 bg-gray-100"
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=967&amp;q=80"
                alt=""
              />
            </div>
          </div>
          <div className="-mt-10 lg:-mt-16">
            <div className="relative w-20 h-20 overflow-hidden border-4 border-white rounded-full lg:w-32 lg:h-32">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <label className="p-2 transition duration-150 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline-gray hover:bg-gray-600">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                  <Icon className="w-5 h-5 text-white" icon="camera" />
                </label>
              </div>
              <img
                className="w-20 h-20 rounded-full lg:w-32 lg:h-32"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                alt=""
              />
            </div>
          </div>
        </section>
        <section className="mt-4 space-y-2">
          <div>
            <Input
              label="Name"
              placeholder="Add your name"
              id="profile-name"
              value={name}
              error={error}
              errorType="name"
              onChange={(e) => setName(e.target.value)}
            />
            <p
              className={`${
                isThreshold(name.length, 50) ? 'text-red-700' : 'text-gray-500'
              } mt-1 text-sm text-right`}
            >
              {name.length}/50
            </p>
          </div>
          <div>
            <Textarea
              label="Bio"
              placeholder="Add your bio"
              id="profile-bio"
              rows="4"
              resize={false}
              value={bio}
              error={error}
              errorType="bio"
              onChange={(e) => setBio(e.target.value)}
            />
            <p
              className={`${
                isThreshold(bio.length, 50) ? 'text-red-700' : 'text-gray-500'
              } mt-1 text-sm text-right`}
            >
              {bio.length}/160
            </p>
          </div>
          <div>
            <Input
              label="Location"
              placeholder="Add your location"
              id="profile-location"
              value={location}
              error={error}
              errorType="location"
              onChange={(e) => setLocation(e.target.value)}
            />
            <p
              className={`${
                isThreshold(location.length, 50)
                  ? 'text-red-700'
                  : 'text-gray-500'
              } mt-1 text-sm text-right`}
            >
              {location.length}/30
            </p>
          </div>
          <div>
            <Input
              label="Website"
              placeholder="Add your website"
              id="profile-website"
              value={website}
              error={error}
              errorType="website"
              onChange={(e) => setWebsite(e.target.value)}
            />
            <p
              className={`${
                isThreshold(website.length, 50)
                  ? 'text-red-700'
                  : 'text-gray-500'
              } mt-1 text-sm text-right`}
            >
              {website.length}/100
            </p>
          </div>
        </section>
      </div>
    </ModalWrapper>
  );
}

export default EditProfile;
