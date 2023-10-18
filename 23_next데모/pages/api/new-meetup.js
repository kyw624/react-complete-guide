import { MongoClient } from 'mongodb';

import { user } from '../../db';

const { username, password } = user;

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // DB 연결
    // 비밀번호에 @ 포함됐을 경우 %40 으로 변경
    const client = await MongoClient.connect(
      `mongodb+srv://${username}:${password}@cluster0.sjwr7sg.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();

    // 컬렉션 추가
    const meetupsCollection = db.collection('meetups');

    // 컬렉션에 새 문서 삽입 (object)
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    // DB 연결 해제
    client.close();

    // 201: 삽입 성공
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
