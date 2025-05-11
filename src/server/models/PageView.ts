import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// Interface for PageView attributes
interface PageViewAttributes {
  id: number;
  url: string;
  user_id?: string;
  session_id: string;
  referrer?: string;
  user_agent?: string;
  ip_address?: string;
  created_at: Date;
}

// Interface for PageView creation attributes
interface PageViewCreationAttributes extends Optional<PageViewAttributes, 'id'> {}

// PageView model class
class PageView extends Model<PageViewAttributes, PageViewCreationAttributes> implements PageViewAttributes {
  public id!: number;
  public url!: string;
  public user_id?: string;
  public session_id!: string;
  public referrer?: string;
  public user_agent?: string;
  public ip_address?: string;
  public created_at!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
PageView.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    session_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    referrer: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      primaryKey: true, // Make part of composite primary key
    },
  },
  {
    sequelize,
    tableName: 'page_views',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: 'page_views_created_at_idx',
        fields: ['created_at'],
      },
      {
        name: 'page_views_url_idx',
        fields: ['url'],
      },
      {
        name: 'page_views_session_id_idx',
        fields: ['session_id'],
      },
    ],
  }
);

export default PageView;
