export class UserObject {
    id: number;
    name: string;
    studentId: string;
    department: string;
    profileImage: string;
    roles: string[];
    createdAt: string;

    constructor(data: {
        id: number;
        name: string;
        studentId: string;
        department: string;
        profileImage: string;
        roles: string[];
        createdAt: string;
    }) {
        this.id = data.id;
        this.name = data.name;
        this.studentId = data.studentId;
        this.department = data.department;
        this.profileImage = data.profileImage;
        this.roles = data.roles;
        this.createdAt = data.createdAt;
    }
}
