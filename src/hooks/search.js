import { useEffect, useState } from 'react';

// This might be overengineering because right now all models use `name`,
// but you could end up with some models that have `title` and some that have `name`,
// or you could decide that animals should use the `scientificMame`` as their primary name.
export function useIdentity(item) {
  const [identity, setIdentity] = useState(null);

  useEffect(() => {
    setIdentity(item.name);
  }, [item.name]);

  return identity;
}

export function useIdentityDetail(item) {
  const [identityDetail, setIdentityDetail] = useState(null);

  useEffect(() => {
    if (item.type === 'animal') {
      setIdentityDetail(item.taxonomy.scientificName);
    } else if (item.type === 'company') {
      const { address1, address2, city, state, postalCode } = item.address || {};
      setIdentityDetail(
        <>
          <div>{address1}</div>
          <div>{address2}</div>
          <div>{`${city}, ${state} ${postalCode}`}</div>
        </>
      );
    } else if (item.type === 'product') {
      setIdentityDetail(item.category);
    }
  }, [item.address, item.category, item.taxonomy, item.type]);

  return identityDetail;
}

export function useDescription(item) {
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (item.type === 'animal') {
      setDescription(null);
    } else if (item.type === 'company') {
      setDescription(item.description);
    } else if (item.type === 'product') {
      setDescription(item.previewText);
    }
  }, [item.description, item.previewText, item.type]);

  return description;
}
