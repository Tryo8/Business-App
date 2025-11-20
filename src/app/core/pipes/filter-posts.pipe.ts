import { Pipe, PipeTransform } from '@angular/core';
import { IPosts } from '../interface/IPosts';

@Pipe({
  name: 'filterPosts'
})
export class FilterPostsPipe implements PipeTransform {

  transform(posts:IPosts[], selectedFilter: any): IPosts[] {
    if (!posts || !selectedFilter) return posts;

    if (selectedFilter === 'mostViewd') {
      return [...posts].sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    if (selectedFilter === 'highestLiked') {
      return [...posts].sort((a, b) => (b.reactions?.likes || 0) - (a.reactions?.likes || 0));
    }

    if (selectedFilter === 'lowestLiked') {
      return [...posts].sort((a, b) => (a.reactions?.likes || 0) - (b.reactions?.likes || 0));
    }

    if (selectedFilter === 'highestDisliked') {
      return [...posts].sort((a, b) => (b.reactions?.dislikes || 0) - (a.reactions?.dislikes || 0));
    }

    if (selectedFilter === 'lowestDisliked') {
      return [...posts].sort((a, b) => (a.reactions?.dislikes || 0) - (b.reactions?.dislikes || 0));
    }

    return posts; // default if no filter
    }

}
