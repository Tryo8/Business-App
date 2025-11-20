import { Pipe, PipeTransform } from '@angular/core';
import { IPosts } from '../interface/IPosts';

@Pipe({
  name: 'searchPosts'
})
export class SearchPostsPipe implements PipeTransform {

  transform(posts: IPosts[], searchTitle:string): IPosts[] {
    return posts.filter((posts) => posts.title?.toLocaleLowerCase() 
    .includes(searchTitle.toLowerCase()));
  };

}
