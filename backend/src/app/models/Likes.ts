import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne, JoinColumn
} from 'typeorm';
  
import Users from './Users';
import Events from './Events';

@Entity('likes')
class Likes {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @PrimaryGeneratedColumn('uuid')
    event_id: string;
  
    @ManyToOne(() => Users)
    @JoinColumn({name: 'user_id'})
    user: Users;

    @ManyToOne(() => Events)
    @JoinColumn({name: 'event_id'})
    event: Events;
}
export default Likes;
  