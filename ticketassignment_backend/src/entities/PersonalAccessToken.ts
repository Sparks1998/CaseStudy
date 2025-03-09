import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Users } from './Users';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Index('CREATE_PERSONAL_ACCESS_TOKEN_TABLE_PRIMARY_KEY', ['id'], {
  unique: true,
})
@Entity('personal_access_token', { schema: 'public' })
@ObjectType()
export class PersonalAccessToken {
  @PrimaryColumn({ type: 'integer', name: 'id' })
  @Field(() => Int)
  id: string;

  @Column('text', { name: 'token' })
  @Field(() => String)
  token: string;

  @Column('boolean', { name: 'remember_token', default: () => 'false' })
  @Field(() => Boolean)
  rememberToken: boolean;

  @Column('integer', { name: 'token_change_count', default: () => '3' })
  @Field(() => Int)
  tokenChangeCount: number;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  createdAt: Date;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => Users, (users) => users.personalAccessTokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  @Field(() => Users)
  user: Users;
}
