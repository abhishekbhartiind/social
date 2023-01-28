import { MigrationInterface, QueryRunner } from "typeorm"

export class MockPosts1674878381157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        insert into post_entity (title, text, images, "creatorId") values ('Gull, kelp', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', '{"http://dummyimage.com/103x291.png/dddddd/000000"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('African darter', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '{"http://dummyimage.com/186x230.png/dddddd/000000"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Pine snake (unidentified)', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', '{"http://dummyimage.com/151x221.png/5fa2dd/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Eastern box turtle', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', '{"http://dummyimage.com/180x177.png/dddddd/000000"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Bird, magnificent frigate', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', '{"http://dummyimage.com/212x118.png/ff4444/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Otter, giant', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '{"http://dummyimage.com/147x224.png/cc0000/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Antelope, roan', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.

Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', '{"http://dummyimage.com/135x212.png/5fa2dd/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Weaver, red-billed buffalo', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '{"http://dummyimage.com/139x194.png/dddddd/000000"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Blackbird, red-winged', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', '{"http://dummyimage.com/170x106.png/dddddd/000000"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Dragon, asian water', 'In congue. Etiam justo. Etiam pretium iaculis justo.

In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', '{"http://dummyimage.com/200x114.png/ff4444/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Blue-breasted cordon bleu', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', '{"http://dummyimage.com/114x184.png/dddddd/000000"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Woodcock, american', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', '{"http://dummyimage.com/118x218.png/ff4444/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Clark''s nutcracker', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '{"http://dummyimage.com/245x276.png/cc0000/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Pelican, eastern white', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '{"http://dummyimage.com/216x131.png/ff4444/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Wildebeest, blue', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', '{"http://dummyimage.com/172x222.png/5fa2dd/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Alpaca', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '{"http://dummyimage.com/184x213.png/ff4444/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Gnu, brindled', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '{"http://dummyimage.com/107x209.png/ff4444/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Onager', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', '{"http://dummyimage.com/223x166.png/ff4444/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Openbill, asian', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '{"http://dummyimage.com/178x253.png/ff4444/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Shelduck, european', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '{"http://dummyimage.com/161x238.png/ff4444/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Kangaroo, jungle', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '{"http://dummyimage.com/243x159.png/ff4444/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Common green iguana', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', '{"http://dummyimage.com/131x274.png/dddddd/000000"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Polar bear', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '{"http://dummyimage.com/140x285.png/cc0000/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Jackal, indian', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', '{"http://dummyimage.com/207x217.png/5fa2dd/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Sandpiper, spotted wood', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '{"http://dummyimage.com/143x158.png/dddddd/000000"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Indian star tortoise', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', '{"http://dummyimage.com/155x262.png/dddddd/000000"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Vulture, lappet-faced', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', '{"http://dummyimage.com/228x217.png/5fa2dd/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Collared lizard', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '{"http://dummyimage.com/189x167.png/cc0000/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Blue-breasted cordon bleu', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '{"http://dummyimage.com/117x288.png/cc0000/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Moose', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '{"http://dummyimage.com/200x171.png/dddddd/000000"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Fairy penguin', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '{"http://dummyimage.com/185x295.png/dddddd/000000"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Wallaby, tammar', 'In congue. Etiam justo. Etiam pretium iaculis justo.', '{"http://dummyimage.com/160x159.png/ff4444/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Long-tailed jaeger', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', '{"http://dummyimage.com/188x129.png/5fa2dd/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Gnu, brindled', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '{"http://dummyimage.com/130x269.png/dddddd/000000"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Leadbeateri''s ground hornbill', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', '{"http://dummyimage.com/105x251.png/5fa2dd/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Dove, galapagos', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', '{"http://dummyimage.com/246x254.png/ff4444/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Vulture, black', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', '{"http://dummyimage.com/133x109.png/cc0000/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Common green iguana', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', '{"http://dummyimage.com/119x277.png/ff4444/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Common green iguana', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '{"http://dummyimage.com/220x143.png/ff4444/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Jungle cat', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '{"http://dummyimage.com/125x197.png/dddddd/000000"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Long-necked turtle', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '{"http://dummyimage.com/182x270.png/ff4444/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Common goldeneye', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', '{"http://dummyimage.com/185x110.png/5fa2dd/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Short-beaked echidna', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.', '{"http://dummyimage.com/245x147.png/5fa2dd/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Crocodile, nile', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '{"http://dummyimage.com/222x248.png/ff4444/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Red-legged pademelon', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '{"http://dummyimage.com/120x241.png/cc0000/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Pied kingfisher', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '{"http://dummyimage.com/246x144.png/cc0000/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Turkey, wild', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '{"http://dummyimage.com/239x258.png/dddddd/000000"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Common boubou shrike', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '{"http://dummyimage.com/124x155.png/5fa2dd/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Otter, cape clawless', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', '{"http://dummyimage.com/124x291.png/5fa2dd/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Catfish, blue', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '{"http://dummyimage.com/141x283.png/cc0000/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Coke''s hartebeest', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '{"http://dummyimage.com/109x253.png/ff4444/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('African fish eagle', 'In congue. Etiam justo. Etiam pretium iaculis justo.', '{"http://dummyimage.com/215x197.png/ff4444/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Collared peccary', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '{"http://dummyimage.com/214x277.png/ff4444/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Siskin, yellow-rumped', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '{"http://dummyimage.com/111x184.png/dddddd/000000"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Pied cormorant', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '{"http://dummyimage.com/211x274.png/dddddd/000000"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Sable antelope', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.

Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', '{"http://dummyimage.com/192x299.png/dddddd/000000"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Savanna baboon', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.', '{"http://dummyimage.com/221x258.png/ff4444/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Leopard', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '{"http://dummyimage.com/153x105.png/dddddd/000000"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Skimmer, four-spotted', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', '{"http://dummyimage.com/197x194.png/ff4444/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Manatee', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '{"http://dummyimage.com/250x245.png/cc0000/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Collared peccary', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.

Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '{"http://dummyimage.com/249x236.png/5fa2dd/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Levaillant''s barbet', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', '{"http://dummyimage.com/241x160.png/dddddd/000000"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Black and white colobus', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '{"http://dummyimage.com/145x279.png/5fa2dd/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Grey phalarope', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', '{"http://dummyimage.com/147x189.png/cc0000/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Crowned hawk-eagle', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', '{"http://dummyimage.com/164x253.png/cc0000/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Deer, savannah', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', '{"http://dummyimage.com/120x250.png/dddddd/000000"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Skunk, western spotted', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '{"http://dummyimage.com/185x188.png/ff4444/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('White-throated kingfisher', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', '{"http://dummyimage.com/147x289.png/ff4444/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Gazelle, grant''s', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', '{"http://dummyimage.com/167x173.png/5fa2dd/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Four-horned antelope', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.

In congue. Etiam justo. Etiam pretium iaculis justo.', '{"http://dummyimage.com/203x182.png/5fa2dd/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('White-browed sparrow weaver', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', '{"http://dummyimage.com/192x226.png/ff4444/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Bare-faced go away bird', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', '{"http://dummyimage.com/155x100.png/dddddd/000000"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Francolin, swainson''s', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', '{"http://dummyimage.com/223x144.png/dddddd/000000"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Pied kingfisher', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.

In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', '{"http://dummyimage.com/174x235.png/5fa2dd/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Possum, pygmy', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '{"http://dummyimage.com/214x251.png/dddddd/000000"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Duiker, common', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', '{"http://dummyimage.com/138x209.png/ff4444/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Monitor, white-throated', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '{"http://dummyimage.com/215x106.png/5fa2dd/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Gambel''s quail', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '{"http://dummyimage.com/215x228.png/cc0000/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Paradoxure', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '{"http://dummyimage.com/177x186.png/ff4444/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Bustard, stanley', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', '{"http://dummyimage.com/233x169.png/5fa2dd/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Greater blue-eared starling', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', '{"http://dummyimage.com/118x102.png/dddddd/000000"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Pintail, white-cheeked', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', '{"http://dummyimage.com/145x125.png/cc0000/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Ringtail', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', '{"http://dummyimage.com/198x168.png/dddddd/000000"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Trumpeter swan', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', '{"http://dummyimage.com/137x138.png/cc0000/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Snake-necked turtle', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', '{"http://dummyimage.com/123x194.png/dddddd/000000"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Cockatoo, sulfur-crested', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', '{"http://dummyimage.com/178x207.png/cc0000/ffffff"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Whip-tailed wallaby', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', '{"http://dummyimage.com/166x147.png/dddddd/000000"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Gonolek, burchell''s', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', '{"http://dummyimage.com/121x196.png/ff4444/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Armadillo, giant', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '{"http://dummyimage.com/193x265.png/5fa2dd/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Hen, sage', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.

Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.', '{"http://dummyimage.com/202x110.png/ff4444/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Wagtail, african pied', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.', '{"http://dummyimage.com/232x208.png/dddddd/000000"}', 3);
insert into post_entity (title, text, images, "creatorId") values ('Alligator, american', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.

Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.

Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', '{"http://dummyimage.com/237x100.png/dddddd/000000"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Black curlew', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.

Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', '{"http://dummyimage.com/217x168.png/ff4444/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Yellow-crowned night heron', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', '{"http://dummyimage.com/164x105.png/cc0000/ffffff"}', 6);
insert into post_entity (title, text, images, "creatorId") values ('Barbet, black-collared', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', '{"http://dummyimage.com/146x215.png/5fa2dd/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Dragon, asian water', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '{"http://dummyimage.com/124x268.png/5fa2dd/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Indian red admiral', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '{"http://dummyimage.com/218x235.png/cc0000/ffffff"}', 5);
insert into post_entity (title, text, images, "creatorId") values ('Mouse, four-striped grass', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '{"http://dummyimage.com/139x199.png/cc0000/ffffff"}', 7);
insert into post_entity (title, text, images, "creatorId") values ('Lemur, grey mouse', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '{"http://dummyimage.com/197x216.png/5fa2dd/ffffff"}', 4);
insert into post_entity (title, text, images, "creatorId") values ('Musk ox', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', '{"http://dummyimage.com/148x211.png/5fa2dd/ffffff"}', 6);
        `);
    }

    public async down(_: QueryRunner): Promise<void> {
        
    }

}
