import { types } from 'mobx-state-tree';
import { UUID } from './utils';
import persist from './persist/persist';

export const CategoryIcon = types.model('CategoryIcon', { subset: '', name: '', color: '', raw: '' }).actions(self => ({
  setColor(color) {
    self.color = color;
  },
}));

export const Category = types
  .model('Category', {
    id: types.identifier,
    title: types.string,
    icon: CategoryIcon,
  })
  .actions(self => ({
    setIcon(icon: CategoryIcon) {
      self.icon = icon;
    },
  }));

export const CategoryCollection = types
  .model('CategoryCollection', {
    items: types.map(Category),
  })
  .views(self => ({
    values() {
      return [...self.items.values()] || [];
    },
    filter(regex) {
      return self.values().filter(category => category.title.search(regex) >= 0);
    },
  }))
  .actions(self => ({
    find(title) {
      for (const [key, item] of self.items) {
        if (item.title === title) return item;
      }
    },
    findOrCreate(title) {
      let entry = self.find(title);
      if (!entry) {
        entry = Category.create({
          id: UUID(),
          title,
          icon: { subset: 'MaterialCommunityIcons', name: 'comment-question-outline', color: '#BEC6C6' },
        });
        self.items.put(entry);
      }
      return entry;
    },
  }));
const categories = CategoryCollection.create();
persist('outcomeCategories', categories);

export default categories;
