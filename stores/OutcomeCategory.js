import { types } from 'mobx-state-tree';
import { UUID } from './utils';
import persist from './persist/persist';

export const Category = types.model('Category', {
  id: types.identifier,
  title: types.string,
});

export const CategoryCollection = types
  .model('CategoryCollection', {
    items: types.map(Category),
  })
  .actions(self => ({
    find(title) {
      for (let item of self.items) {
        if (item.title === title) return item;
      }
    },
    findOrCreate(title) {
      let entry = self.find(title);
      if (!entry) {
        entry = Category.create({
          id: UUID(),
          title,
        });
        self.items.put(entry);
      }
      return entry;
    },
  }));
const categories = CategoryCollection.create();
persist('outcomeCategories', categories);

export default categories;
