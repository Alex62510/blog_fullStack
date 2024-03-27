import React, { useState } from 'react';
import { TextInput } from 'flowbite-react';

export const Search = () => {
  const [sidebarData, setSidebarData] = useState([]);

  return (
    <div>
      <div className={''}>
        <form className={''}>
          <div className={''}>
            <label>Search Term:</label>
            <TextInput
              placeholder={'Search...'}
              id={'searchTerm'}
              type={'text'}
            ></TextInput>
          </div>
        </form>
      </div>
    </div>
  );
};
