import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';

import Users from './Users';
  
@Entity('events')
class Events {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  local: string;

  @Column()
  photo: string;

  @Column()
  remark: string;

  @Column()
  author: string;

  @ManyToOne(() => Users)
  @JoinColumn({name: 'author'})
  autho: Users;

  @Column()
  date_event: Date;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  updated_at: Date;
}

export default Events;
