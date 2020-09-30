import React from 'react';
import { ModalWrapper } from 'components/modal-wrapper';
import { Avatar } from 'components/avatar';
import { TextButton } from 'components/button';

function CreateComment() {
  return (
    <ModalWrapper modalPosition="top">
      <section className="flex p-4 space-x-3">
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0">
            <Avatar size="lg" src="" alt="" />
          </div>
          <div className="flex-1 w-0.5 my-1 bg-gray-300"></div>
        </div>
        <div className="flex flex-col flex-1">
          <div>
            <div className="flex items-center">
              <TextButton
                to="/"
                color="black"
                size="sm"
                className="relative font-bold"
              >
                Abeid Ahmed
              </TextButton>
              <span className="pl-2 text-sm leading-5 text-gray-500">
                @iamhawaabi
              </span>
              <span className="mx-1">&middot;</span>
              <span className="text-sm leading-5 text-gray-500">Sep, 20</span>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              distinctio voluptates, aspernatur culpa dolore optio dolores sit.
              Sed hic quae eum vero quam ipsam, similique praesentium quaerat in
              molestiae sit!
            </p>
          </div>
        </div>
      </section>
    </ModalWrapper>
  );
}

export default CreateComment;
